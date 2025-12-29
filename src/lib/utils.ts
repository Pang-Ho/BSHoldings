import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Figma 토큰 Tailwind 토큰으로 변환 함수
type FigmaColorValue = {
  colorSpace: string;
  components: number[];
  alpha: number;
  hex: string;
};

type FigmaColorToken = {
  $type: "color";
  $value: FigmaColorValue;
  $extensions?: Record<string, unknown>;
};

type FigmaTokenNode =
  | FigmaColorToken
  | {
      [key: string]: FigmaTokenNode;
    };

type ExtractedCssVar = string;

function extractCssColorVariables(
  tokens: Record<string, FigmaTokenNode>,
  options?: {
    /** 제거할 루트 키 (예: ['Color']) */
    ignoreKeys?: string[];
  },
): ExtractedCssVar[] {
  const result: ExtractedCssVar[] = [];
  const ignore = options?.ignoreKeys ?? ["Color"];

  function traverse(node: FigmaTokenNode, path: string[] = []): void {
    if (
      typeof node === "object" &&
      "$type" in node &&
      node.$type === "color" &&
      "hex" in node.$value
    ) {
      const filteredPath = path.filter((p) => !ignore.includes(p));

      const cssVarName =
        "--" + filteredPath.map((p) => p.toLowerCase()).join("-");

      result.push(`${cssVarName}: ${node.$value.hex}`);
      return;
    }

    if (typeof node === "object") {
      for (const key in node) {
        traverse((node as Record<string, FigmaTokenNode>)[key], [...path, key]);
      }
    }
  }

  traverse(tokens);
  return result;
}
