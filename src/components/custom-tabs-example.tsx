'use client';

import { Example } from '@/components/example';
import {
  CustomTabs,
  CustomTabsContent,
  CustomTabsList,
  CustomTabsTrigger,
} from '@/components/ui/custom-tabs';

export function CustomTabsExample() {
  return (
    <Example title="Custom Tabs" className="items-start justify-start">
      <div className="space-y-8 w-full">
        {/* 가로형 탭 */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">가로형 탭 (Horizontal):</h4>
          <CustomTabs defaultValue="tab1" variant="horizontal">
            <CustomTabsList variant="horizontal">
              <CustomTabsTrigger value="tab1" variant="horizontal">
                탭 1
              </CustomTabsTrigger>
              <CustomTabsTrigger value="tab2" variant="horizontal">
                탭 2
              </CustomTabsTrigger>
              <CustomTabsTrigger value="tab3" variant="horizontal">
                탭 3
              </CustomTabsTrigger>
              <CustomTabsTrigger value="tab4" variant="horizontal">
                긴 탭 이름
              </CustomTabsTrigger>
            </CustomTabsList>
            <CustomTabsContent
              value="tab1"
              className="mt-4 p-4 border rounded-md"
            >
              <h3 className="text-lg font-semibold mb-2">탭 1 내용</h3>
              <p>
                첫 번째 탭의 내용입니다. 가로형 탭에서는 탭이 가로로 배치되고,
                선택된 탭에는 하단에 2px 검은색 테두리가 표시됩니다.
              </p>
            </CustomTabsContent>
            <CustomTabsContent
              value="tab2"
              className="mt-4 p-4 border rounded-md"
            >
              <h3 className="text-lg font-semibold mb-2">탭 2 내용</h3>
              <p>두 번째 탭의 내용입니다.</p>
            </CustomTabsContent>
            <CustomTabsContent
              value="tab3"
              className="mt-4 p-4 border rounded-md"
            >
              <h3 className="text-lg font-semibold mb-2">탭 3 내용</h3>
              <p>세 번째 탭의 내용입니다.</p>
            </CustomTabsContent>
            <CustomTabsContent
              value="tab4"
              className="mt-4 p-4 border rounded-md"
            >
              <h3 className="text-lg font-semibold mb-2">긴 탭 이름 내용</h3>
              <p>네 번째 탭의 내용입니다.</p>
            </CustomTabsContent>
          </CustomTabs>
        </div>

        {/* 세로형 탭 */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">세로형 탭 (Vertical):</h4>
          <CustomTabs defaultValue="vtab1" variant="vertical">
            <div className="flex gap-6">
              <CustomTabsList variant="vertical">
                <CustomTabsTrigger value="vtab1" variant="vertical">
                  세로 탭 1
                </CustomTabsTrigger>
                <CustomTabsTrigger value="vtab2" variant="vertical">
                  세로 탭 2
                </CustomTabsTrigger>
                <CustomTabsTrigger value="vtab3" variant="vertical">
                  세로 탭 3
                </CustomTabsTrigger>
                <CustomTabsTrigger value="vtab4" variant="vertical">
                  긴 세로 탭 이름
                </CustomTabsTrigger>
              </CustomTabsList>
              <div className="flex-1">
                <CustomTabsContent
                  value="vtab1"
                  className="p-4 border rounded-md"
                >
                  <h3 className="text-lg font-semibold mb-2">세로 탭 1 내용</h3>
                  <p>
                    첫 번째 세로 탭의 내용입니다. 세로형 탭에서는 탭이 세로로
                    배치되고, 각 탭 아이템은 200px 너비와 49px 높이를 가집니다.
                  </p>
                </CustomTabsContent>
                <CustomTabsContent
                  value="vtab2"
                  className="p-4 border rounded-md"
                >
                  <h3 className="text-lg font-semibold mb-2">세로 탭 2 내용</h3>
                  <p>두 번째 세로 탭의 내용입니다.</p>
                </CustomTabsContent>
                <CustomTabsContent
                  value="vtab3"
                  className="p-4 border rounded-md"
                >
                  <h3 className="text-lg font-semibold mb-2">세로 탭 3 내용</h3>
                  <p>세 번째 세로 탭의 내용입니다.</p>
                </CustomTabsContent>
                <CustomTabsContent
                  value="vtab4"
                  className="p-4 border rounded-md"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    긴 세로 탭 이름 내용
                  </h3>
                  <p>네 번째 세로 탭의 내용입니다.</p>
                </CustomTabsContent>
              </div>
            </div>
          </CustomTabs>
        </div>
      </div>
    </Example>
  );
}
