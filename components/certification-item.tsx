"use client";

import {
  Arrow,
  Content,
  Portal,
  Provider,
  Root,
  Trigger,
} from "@radix-ui/react-tooltip";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Certification } from "@/data/picturesandicons";
import { cn } from "@/lib/utils";

export default function CertificationItem({
  certification,
}: {
  certification: Certification;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const content = (
    <div className="group flex cursor-pointer items-baseline gap-1">
      <span className="shrink-0 text-gray-900 transition-colors group-hover:text-gray-600">
        {certification.name}
      </span>
      <span className="dot-leaders min-w-4 flex-1" />
      <span className="text-right text-gray-600">{certification.year}</span>
    </div>
  );

  return (
    <Provider delayDuration={100}>
      <Root>
        <Trigger asChild>
          {certification.url ? (
            <Link
              href={certification.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {content}
            </Link>
          ) : (
            content
          )}
        </Trigger>
        <Portal>
          <Content
            className={cn(
              "z-50 origin-(--radix-tooltip-content-transform-origin)",
              "fade-in-0 zoom-in-95 animate-in duration-200",
              "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
              "overflow-hidden rounded-lg shadow-xl",
              "border border-gray-200 bg-white"
            )}
            side="top"
            sideOffset={8}
          >
            <div className="relative aspect-[4/3] w-72">
              {/* Skeleton de chargement */}
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gray-100" />
              )}
              <Image
                alt={`Certificat ${certification.name}`}
                className={cn(
                  "object-contain transition-opacity duration-300",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                fill
                onLoad={() => setImageLoaded(true)}
                // Performance: placeholder blur pour transition douce
                placeholder="blur"
                // Performance: qualité réduite pour le tooltip (pas besoin de HD)
                quality={75}
                sizes="288px"
                src={certification.certificate}
              />
            </div>
            <div className="border-gray-100 border-t bg-gray-50 px-3 py-2">
              <p className="text-gray-500 text-xs">{certification.issuer}</p>
            </div>
            <Arrow className="fill-white" />
          </Content>
        </Portal>
      </Root>
    </Provider>
  );
}
