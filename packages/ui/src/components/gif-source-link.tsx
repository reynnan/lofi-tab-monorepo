"use client";
import { useSettings } from "@repo/ui/providers/settings-provider";
import { LOFI_GIFS } from "@repo/ui/utils/constants";

export default function GifSourceLink() {
  const {
    settings: { backgroundUrl },
  } = useSettings();
  const metadata = findLofiMetadata(backgroundUrl);

  if (!metadata) {
    return (
      <a
        href={backgroundUrl}
        rel="noreferrer"
        target="_blank"
        className="font-bold text-xs"
      >
        Source
      </a>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-xs">
      <p className="p-0 text-base-content font-extrabold">
        {`${metadata.title}, ${metadata.year}`}
      </p>
      <div className="flex items-center gap-1 text-base-content/80">
        <a
          href={metadata.url}
          rel="noreferrer"
          target="_blank"
          className="font-bold hover:text-base-content transition-colors duration-200"
        >
          Image
        </a>
        <span>{"|"}</span>
        <a
          href={metadata.link}
          rel="noreferrer"
          target="_blank"
          className="font-bold hover:text-base-content transition-colors duration-200"
        >
          Source
        </a>
      </div>
    </div>
  );
}

const findLofiMetadata = (backgroundUrl: string) => {
  return LOFI_GIFS.find(({ url }) => url === backgroundUrl);
};
