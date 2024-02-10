import React from "react";
import {
  Card,
  YGroup,
  H3,
  Paragraph,
  Button,
  XStack,
  Separator,
  View,
} from "tamagui";
import { Assets } from "../types/release";
import { Linking } from "react-native";
import { DownloadCloud, Copy, Share2 } from "@tamagui/lucide-icons";
import { copyToClipboard, onShare, showToast } from "../utils";

type DisplayAppProps = {
  release: Assets;
};

export default function DisplayApp(props: DisplayAppProps) {
  const { release } = props;
  return (
    <YGroup.Item>
      <View>
        <Card bordered size="$2" paddingHorizontal="$2" paddingBottom="$3">
          <Card.Header width="100%">
            <H3>{release.name}</H3>
            <Paragraph theme="alt1">{release.fileName}</Paragraph>
            <Separator marginVertical="$1" />
            <XStack alignItems="center">
              <Paragraph>{release.version}</Paragraph>
              <Separator alignSelf="stretch" vertical marginHorizontal={15} />
              <Paragraph>{release.arch}</Paragraph>
            </XStack>
          </Card.Header>
          <Card.Footer gap="$2" justifyContent="center" width="100%">
            <Button
              borderRadius="$12"
              size="$3"
              bordered
              theme="blue_alt1"
              width="60%"
              onPress={() => Linking.openURL(release.browser_download_url)}
            >
              <DownloadCloud size="$1" /> Download
            </Button>
            <Button
              borderRadius="$12"
              size="$3"
              theme="blue_alt1"
              width="15%"
              padding="$2"
              onPress={() => {
                copyToClipboard(release.browser_download_url);
                showToast("Link copied to clipboard");
              }}
            >
              <Copy size="$1" />
            </Button>
            <Button
              borderRadius="$12"
              size="$3"
              theme="blue_alt1"
              width="15%"
              padding="$2"
              onPress={() => {
                const title = `${release.name} ${release.version}`;
                const message = `Download ${release.fileName} from ${release.browser_download_url}
                \n\nShared via PreVanced Manager - https://github.com/PreVanced/prevanced-manager`;
                onShare(title, message, release.browser_download_url);
              }}
            >
              <Share2 size="$1" />
            </Button>
          </Card.Footer>
        </Card>
      </View>
    </YGroup.Item>
  );
}
