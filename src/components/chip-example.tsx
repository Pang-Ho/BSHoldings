'use client';

import { Example } from '@/components/example';
import { Chip, ChipGroup, ChipGroupItem } from '@/components/ui/chip';
import * as React from 'react';

export default function ChipExample() {
  const [selectedValue, setSelectedValue] = React.useState<string>('option1');
  const [selectedMediumValue, setSelectedMediumValue] =
    React.useState<string>('medium1');

  return (
    <Example title="Chip" className="items-center justify-center">
      <div className="space-y-6 w-full">
        {/* 개별 칩 사용 */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">개별 칩:</h4>
          <div className="flex gap-2">
            <Chip>기본 상태</Chip>
            <Chip selected>선택된 상태</Chip>
          </div>
        </div>

        {/* 사이즈 비교 */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">사이즈 비교:</h4>
          <div className="flex gap-2 items-center">
            <Chip size="medium">Medium (30px)</Chip>
            <Chip size="large">Large (34px)</Chip>
          </div>
        </div>

        {/* 칩 그룹 사용 - Large */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">칩 그룹 - Large (기본):</h4>
          <ChipGroup value={selectedValue} onValueChange={setSelectedValue}>
            <ChipGroupItem value="option1">옵션 1</ChipGroupItem>
            <ChipGroupItem value="option2">옵션 2</ChipGroupItem>
            <ChipGroupItem value="option3">옵션 3</ChipGroupItem>
            <ChipGroupItem value="option4">옵션 4</ChipGroupItem>
          </ChipGroup>
          <p className="text-sm text-muted-foreground">
            선택된 값: {selectedValue}
          </p>
        </div>

        {/* 칩 그룹 사용 - Medium */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">칩 그룹 - Medium:</h4>
          <ChipGroup
            size="medium"
            value={selectedMediumValue}
            onValueChange={setSelectedMediumValue}
          >
            <ChipGroupItem value="medium1">Medium 1</ChipGroupItem>
            <ChipGroupItem value="medium2">Medium 2</ChipGroupItem>
            <ChipGroupItem value="medium3">Medium 3</ChipGroupItem>
          </ChipGroup>
          <p className="text-sm text-muted-foreground">
            선택된 값: {selectedMediumValue}
          </p>
        </div>

        {/* 다양한 텍스트 길이 */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">다양한 텍스트 길이:</h4>
          <div className="flex flex-wrap gap-2">
            <Chip>짧음</Chip>
            <Chip selected>중간 길이 텍스트</Chip>
            <Chip>매우 긴 텍스트가 들어간 칩</Chip>
          </div>
        </div>
      </div>
    </Example>
  );
}
