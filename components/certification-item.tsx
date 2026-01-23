'use client';

import {
  Arrow,
  Content,
  Portal,
  Provider,
  Root,
  Trigger,
} from '@radix-ui/react-tooltip';
import type { Certification } from '@/data/picturesandicons';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function CertificationItem({
  certification,
}: {
  certification: Certification;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const content = (
    <div className="flex items-baseline gap-1 cursor-pointer group">
      <span className="text-gray-900 shrink-0 transition-colors group-hover:text-gray-600">
        {certification.name}
      </span>
      <span className="dot-leaders min-w-4 flex-1" />
      <span className="text-gray-600 text-right">
        {certification.year}
      </span>
    </div>
  );

  return (
    <Provider delayDuration={100}>
      <Root>
        <Trigger asChild>
          {certification.url ? (
            <Link
              href={certification.url}
              target="_blank"
              rel="noopener noreferrer"
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
              'z-50 origin-(--radix-tooltip-content-transform-origin)',
              'animate-in fade-in-0 zoom-in-95 duration-200',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
              'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
              'rounded-lg shadow-xl overflow-hidden',
              'bg-white border border-gray-200'
            )}
            sideOffset={8}
            side="top"
          >
            <div className="relative w-72 aspect-[4/3]">
              {/* Skeleton de chargement */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse" />
              )}
              <Image
                src={certification.certificate}
                alt={`Certificat ${certification.name}`}
                fill
                sizes="288px"
                className={cn(
                  'object-contain transition-opacity duration-300',
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                )}
                onLoad={() => setImageLoaded(true)}
                // Performance: placeholder blur pour transition douce
                placeholder="blur"
                // Performance: qualité réduite pour le tooltip (pas besoin de HD)
                quality={75}
              />
            </div>
            <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-500">{certification.issuer}</p>
            </div>
            <Arrow className="fill-white" />
          </Content>
        </Portal>
      </Root>
    </Provider>
  );
}
