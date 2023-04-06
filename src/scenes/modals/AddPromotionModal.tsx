import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

import type { Movie } from "@prisma/client";

type AddPromotionModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  movie: Movie;
};

const AddPromotionModal = (props: AddPromotionModalProps) => {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8  sm:max-w-5xl">
                <div className="my-auto grid w-full rounded-md bg-white p-6 shadow-md lg:max-w-xl">
                  <h1 className="text-dark-red mb-8 text-center text-3xl font-semibold">
                    {`Promotions`}
                  </h1>
                  <form className="my-auto w-full max-w-lg">
                    <div className="-mx-3 mb-6 flex flex-wrap items-center">
                      <div className="mb-6 w-full px-3 md:mb-0 md:w-2/5">
                        <label
                          htmlFor="grid-first-name"
                          className="mb-2 block text-center text-xs font-bold uppercase tracking-wide text-gray-700"
                        >
                          Promotion Code
                        </label>
                        <input
                          className="block w-full appearance-none rounded border bg-gray-200 py-3 px-4 text-center leading-tight text-gray-700 focus:bg-white focus:outline-none"
                          id="grid-first-name"
                          type="text"
                          placeholder="######"
                        />
                      </div>
                      <div className="w-full px-3 md:w-2/5">
                        <label
                          htmlFor="grid-last-name"
                          className="mb-2 block text-center text-xs font-bold uppercase tracking-wide text-gray-700"
                        >
                          Discount Amount ($USD)
                        </label>
                        <input
                          className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 text-center leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                          id="grid-last-name"
                          type="text"
                          placeholder="0.00"
                        />
                      </div>
                      <div className="mt-6 w-full  md:w-1/5">
                        <button
                          className="bg-dark-red hover:bg-light-coral focus:bg-light-coral w-full transform rounded-md px-4 py-2 tracking-wide text-white transition-colors duration-200 focus:outline-none"
                          type="button"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    <div className="-mx-3 mb-6 flex flex-wrap items-center">
                      <div className="mb-6 w-full px-3 md:mb-0 md:w-2/5">
                        <input
                          className="block w-full appearance-none rounded border bg-gray-300 py-3 px-4 text-center leading-tight text-gray-700 "
                          id="grid-first-name"
                          type="text"
                          value={"PROMOTION10"}
                          readOnly
                        />
                      </div>
                      <div className="w-full px-3 md:w-2/5">
                        <input
                          className="block w-full appearance-none rounded border border-gray-200 bg-gray-300 py-3 px-4 text-center leading-tight text-gray-700 focus:border-gray-500 "
                          id="grid-last-name"
                          type="text"
                          value={"$0.00"}
                          readOnly
                        />
                      </div>
                      <div className="w-full md:w-1/5">
                        <button
                          className="bg-dark-red hover:bg-light-coral focus:bg-light-coral w-full transform rounded-md px-4 py-2 text-center tracking-wide text-white transition-colors duration-200 focus:outline-none"
                          type="button"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-between">
                      <button className="bg-dark-red hover:bg-light-coral focus:bg-light-coral w-1/3 transform rounded-md px-4 py-2 ml-5 mr-2 tracking-wide text-white transition-colors duration-200 focus:outline-none">
                        Make Changes
                      </button>
                      <button className="bg-dark-red hover:bg-light-coral focus:bg-light-coral w-1/3 transform rounded-md px-4 py-2 ml-2 mr-5 tracking-wide text-white transition-colors duration-200 focus:outline-none">
                        Send Promotions
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddPromotionModal;
