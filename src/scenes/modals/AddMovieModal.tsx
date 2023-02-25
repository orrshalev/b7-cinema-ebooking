import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type AddMovieModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AddMovieModal = (props: AddMovieModalProps) => {
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
                  <h1 className="mb-8 text-center text-3xl font-semibold text-dark-red">
                    {`Add a Movie`}
                  </h1>
                  <form className="my-auto w-full max-w-lg">
                    <div className="-mx-3 mb-6 flex flex-wrap">
                      <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                        <label
                          htmlFor="grid-first-name"
                          className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        >
                          Title
                        </label>
                        <input
                          className="mb-3 block w-full appearance-none rounded border bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                          id="grid-first-name"
                          type="text"
                        />
                      </div>
                      <div className="w-full px-3 md:w-1/2">
                        <label
                          htmlFor="grid-last-name"
                          className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        >
                          Genre
                        </label>
                        <input
                          className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                          id="grid-last-name"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="-mx-3 mb-6 flex flex-wrap">
                      <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                        <label
                          htmlFor="grid-city"
                          className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        >
                          length
                        </label>
                        <input
                          className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                          id="grid-city"
                          type="text"
                        />
                      </div>
                      <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                        <label
                          htmlFor="grid-state"
                          className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        >
                          Rating
                        </label>
                        <div className="relative">
                          <select
                            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                            id="grid-state"
                          >
                            <option>G</option>
                            <option>PG</option>
                            <option>PG-13</option>
                            <option>R</option>
                            <option>NC-17</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="h-4 w-4 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="-mx-3 mb-6 flex flex-wrap">
                      <div className="w-full px-3">
                        <label
                          htmlFor="grid-email-address"
                          className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        >
                          Thumbnail URL
                        </label>
                        <input
                          className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                          id="grid-email-address"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="-mx-3 mb-6 flex flex-wrap">
                      <div className="w-full px-3">
                        <label
                          htmlFor="grid-email-address"
                          className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        >
                          Trailer URL
                        </label>
                        <input
                          className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                          id="grid-email-address"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <button className="w-full transform rounded-md bg-dark-red px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-light-coral focus:bg-light-coral focus:outline-none">
                        Add Movie
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

export default AddMovieModal;
