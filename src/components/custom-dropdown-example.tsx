'use client';

import { Example } from '@/components/example';
import {
  CustomDropdown,
  CustomDropdownContent,
  CustomDropdownGroup,
  CustomDropdownItem,
  CustomDropdownLabel,
  CustomDropdownSeparator,
  CustomDropdownTrigger,
  CustomDropdownValue,
} from '@/components/ui/custom-dropdown';
import * as React from 'react';

export function CustomDropdownExample() {
  const [selectedValue1, setSelectedValue1] = React.useState('option1');
  const [selectedValue2, setSelectedValue2] = React.useState('');

  return (
    <Example title="Custom Dropdown" className="items-start justify-start">
      <div className="space-y-8 w-full">
        {/* 기본 드롭다운 */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">기본 드롭다운:</h4>
          <div className="flex gap-4 flex-wrap">
            <CustomDropdown
              value={selectedValue1}
              onValueChange={setSelectedValue1}
            >
              <CustomDropdownTrigger>
                <CustomDropdownValue placeholder="선택하세요" />
              </CustomDropdownTrigger>
              <CustomDropdownContent>
                <CustomDropdownItem value="option1">옵션 1</CustomDropdownItem>
                <CustomDropdownItem value="option2">옵션 2</CustomDropdownItem>
                <CustomDropdownItem value="option3">옵션 3</CustomDropdownItem>
                <CustomDropdownItem value="option4">
                  긴 옵션 이름
                </CustomDropdownItem>
              </CustomDropdownContent>
            </CustomDropdown>

            <CustomDropdown>
              <CustomDropdownTrigger>
                <CustomDropdownValue placeholder="선택한 아이템" />
              </CustomDropdownTrigger>
              <CustomDropdownContent>
                <CustomDropdownItem value="selected">
                  선택한 아이템
                </CustomDropdownItem>
                <CustomDropdownItem value="item2">아이템 2</CustomDropdownItem>
                <CustomDropdownItem value="item3">아이템 3</CustomDropdownItem>
              </CustomDropdownContent>
            </CustomDropdown>

            <CustomDropdown defaultValue="default">
              <CustomDropdownTrigger>
                <CustomDropdownValue placeholder="기본값" />
              </CustomDropdownTrigger>
              <CustomDropdownContent>
                <CustomDropdownItem value="default">기본값</CustomDropdownItem>
                <CustomDropdownItem value="other1">
                  다른 옵션 1
                </CustomDropdownItem>
                <CustomDropdownItem value="other2">
                  다른 옵션 2
                </CustomDropdownItem>
              </CustomDropdownContent>
            </CustomDropdown>
          </div>
        </div>

        {/* 그룹화된 드롭다운 */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">그룹화된 드롭다운:</h4>
          <CustomDropdown
            value={selectedValue2}
            onValueChange={setSelectedValue2}
          >
            <CustomDropdownTrigger>
              <CustomDropdownValue placeholder="카테고리 선택" />
            </CustomDropdownTrigger>
            <CustomDropdownContent>
              <CustomDropdownGroup>
                <CustomDropdownLabel>과일</CustomDropdownLabel>
                <CustomDropdownItem value="apple">사과</CustomDropdownItem>
                <CustomDropdownItem value="banana">바나나</CustomDropdownItem>
                <CustomDropdownItem value="orange">오렌지</CustomDropdownItem>
              </CustomDropdownGroup>
              <CustomDropdownSeparator />
              <CustomDropdownGroup>
                <CustomDropdownLabel>채소</CustomDropdownLabel>
                <CustomDropdownItem value="carrot">당근</CustomDropdownItem>
                <CustomDropdownItem value="lettuce">상추</CustomDropdownItem>
                <CustomDropdownItem value="tomato">토마토</CustomDropdownItem>
              </CustomDropdownGroup>
            </CustomDropdownContent>
          </CustomDropdown>
        </div>

        {/* 상태 설명 */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">드롭다운 상태:</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              • <strong>기본 상태:</strong> 120px × 36px, radius 2px, border 1px
              (button-gray-filled-border-default)
            </p>
            <p>
              • <strong>Hover 상태:</strong> border 1.2px
              (button-primary-outlined-border-default)
            </p>
            <p>
              • <strong>Selected/Focus 상태:</strong> border 1px (grey-850)
            </p>
            <p>
              • <strong>옵션 아이템:</strong> 높이 32px, hover 시 배경
              primary-50
            </p>
            <p>
              • <strong>선택된 아이템:</strong> 우측에 체크 아이콘 (primary-500)
            </p>
          </div>
        </div>

        {/* 다양한 너비 예제 */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">다양한 너비와 긴 텍스트:</h4>
          <div className="flex gap-4 flex-wrap">
            <CustomDropdown>
              <CustomDropdownTrigger className="w-[150px]">
                <CustomDropdownValue placeholder="넓은 드롭다운" />
              </CustomDropdownTrigger>
              <CustomDropdownContent>
                <CustomDropdownItem value="wide1">
                  넓은 옵션 1
                </CustomDropdownItem>
                <CustomDropdownItem value="wide2">
                  매우 긴 옵션 텍스트가 들어간 아이템
                </CustomDropdownItem>
                <CustomDropdownItem value="wide3">
                  이것은 정말로 매우 긴 텍스트입니다
                </CustomDropdownItem>
              </CustomDropdownContent>
            </CustomDropdown>

            <CustomDropdown>
              <CustomDropdownTrigger className="w-[100px]">
                <CustomDropdownValue placeholder="좁은" />
              </CustomDropdownTrigger>
              <CustomDropdownContent>
                <CustomDropdownItem value="narrow1">좁은 1</CustomDropdownItem>
                <CustomDropdownItem value="narrow2">
                  긴 텍스트 아이템
                </CustomDropdownItem>
                <CustomDropdownItem value="narrow3">
                  매우 긴 텍스트가 잘리는지 확인
                </CustomDropdownItem>
              </CustomDropdownContent>
            </CustomDropdown>

            <CustomDropdown>
              <CustomDropdownTrigger>
                <CustomDropdownValue placeholder="기본 120px" />
              </CustomDropdownTrigger>
              <CustomDropdownContent>
                <CustomDropdownItem value="default1">
                  기본 옵션
                </CustomDropdownItem>
                <CustomDropdownItem value="default2">
                  중간 길이의 텍스트
                </CustomDropdownItem>
                <CustomDropdownItem value="default3">
                  이것은 120px 너비에서 잘리는 긴 텍스트입니다
                </CustomDropdownItem>
                <CustomDropdownItem value="default4">
                  체크 아이콘과 겹치지 않도록 처리됩니다
                </CustomDropdownItem>
              </CustomDropdownContent>
            </CustomDropdown>
          </div>
        </div>
      </div>
    </Example>
  );
}
