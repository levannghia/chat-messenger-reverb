import { useChatMessageStore } from '@/store/chatMessageStore';
import { Dialog, Transition } from '@headlessui/react';
import moment from 'moment';
import React, { Fragment, useRef, useState } from 'react'
import { BsXLg } from 'react-icons/bs';
import { FaCircleNotch } from 'react-icons/fa';
import ReactImageGallery from 'react-image-gallery';

export default function PopupGallery() {
  const [isLoading, setIsLoading] = useState(false);
  const refGallery = useRef();
  const { media, selectedMedia, setSelectedMedia, clearSelectedMedia } = useChatMessageStore();

  useEffect(() => {
    if (refGallery.current) {
      const currentIndex = media.findIndex(
        (image) => image.file_name === selectedMedia?.file_name,
      );
      refGallery.current?.slideToIndex(currentIndex);
    }
  }, [selectedMedia]);

  if (!selectedMedia) return;

  const handleOnSlide = (currentIndex) => {
    setSelectedMedia(media[currentIndex]);
  };

  return (
    <Transition
      as={Fragment}
      show={typeof selectedMedia !== undefined}
      leave="duration-200"
    >
      <Dialog
        as="div"
        id="modal"
        className="fixed inset-0 z-50 flex transform items-center overflow-hidden transition-all"
        onClose={clearSelectedMedia}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 h-full w-full bg-black/90" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <Dialog.Panel className="relative z-30 flex h-screen w-screen transform flex-col transition-all">
            <div className="relative z-10 flex w-full items-center justify-between px-4 py-2">
              <div className="flex items-center gap-2">
                <div>
                  <img
                    src={selectedMedia.sent_by.avatar}
                    alt={selectedMedia.sent_by.name}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="leading-4">
                  <h5 className="font-medium text-gray-50">
                    {selectedMedia.sent_by.name}
                  </h5>
                  <span className="text-xs text-gray-400">
                    {moment(selectedMedia.created_at).format("DD/MM/YYYY H:mm")}
                  </span>
                </div>
              </div>
              <button
                className="flex items-center justify-center rounded-lg border-2 border-secondary/25 p-1 text-xl text-gray-50 transition-all hover:scale-105 hover:border-primary hover:text-primary focus-visible:outline-none dark:border-secondary/75 dark:hover:border-primary"
                onClick={clearSelectedMedia}
              >
                <BsXLg />
              </button>
            </div>

            {isLoading && (
              <div className="image-gallery-loader-wrapper">
                <div className="image-gallery-loader-original m-auto">
                  <FaCircleNotch className="animate-spin" />
                </div>
                <div className="mx-auto mb-1 flex">
                  {media.map((_, index) => (
                    <div
                      key={index}
                      className="image-gallery-thumbnail image-gallery-loader-thumbnail"
                    >
                      <FaCircleNotch className="animate-spin" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ReactImageGallery
              ref={refGallery}
              showFullscreenButton={false}
              showPlayButton={false}
              infinite={false}
              additionalClass={
                isLoading
                  ? "hidden"
                  : "m-auto w-full lg:w-[80%] xl:w-[70%] z-[60]"
              }
              items={media
                .sort((a, b) => a.created_at.localeCompare(b.created_at))
                .map((image) => {
                  return {
                    thumbnail: `${image.file_path}/${image.file_name}`,
                    original: `${image.file_path}/${image.file_name}`,
                  };
                })}
              onImageLoad={() => setIsLoading(false)}
              onErrorImageURL="The image could not be loaded"
              onSlide={handleOnSlide}
            />
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
