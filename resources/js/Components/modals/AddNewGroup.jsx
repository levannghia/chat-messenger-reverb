import React, { Fragment, useRef, useState } from 'react'
import Modal from '@/Components/modals/Modal';
import { useModalContext } from '@/Contexts/modal-context';
import { BsCamera } from 'react-icons/bs';
import InputError from '../InputError';
import { useForm } from '@inertiajs/react';
import TextArea from '../TextArea';
import InputLabel from '../InputLabel';
import TextInput from '../TextInput';
import ComboboxComponent from '@/Components/ComboboxComponent';

export default function AddNewGroup() {
  const { closeModal } = useModalContext();
  const avatarRef = useRef(null);
  const { data, post, setData, errors, processing, recentlySuccessful } = useForm({
    _method: 'POST',
    name: "",
    description: "",
    avatar: null,
    group_members: [],
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(processing) return

    post(route('group.store'), {
      onSuccess: (response) => {
        closeModal();
      }
    });
  }

  const changeAvatar = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setData('avatar', files[0]);
      const imageUrl = window.URL.createObjectURL(files[0]);
      avatarRef.current?.setAttribute("src", imageUrl)

      return () => {
        window.URL.revokeObjectURL(imageUrl)
      }
    }

  }

  const addMembers = (value) => {
    setData('group_members', value)
  }

  return (
    <form onSubmit={handleOnSubmit} className='space-y-4'>
      <Modal>
        <Modal.Header title="New Group" onClose={closeModal} />
        <Modal.Body as={Fragment}>
          <div className="picture relative">
            <img
              src="/images/group-avatar.png"
              alt="group-avatar.png"
              className="mx-auto h-20 w-20 rounded-full border border-secondary"
              ref={avatarRef}
            />

            <label
              htmlFor="avatar"
              className="btn btn-primary absolute left-1/2 top-6 flex translate-x-5 cursor-pointer items-center justify-center rounded-full px-2"
              tabIndex={0}
            >
              <BsCamera />
              <input
                type="file"
                onChange={changeAvatar}
                id="avatar"
                className="hidden"
              />
            </label>

            <InputError className="mt-2 text-center" message={errors.avatar} />
          </div>
          <div className="space-y-2">
            <InputLabel htmlFor="name" value="Subject" />

            <TextInput
              id="name"
              type="text"
              className="mt-1 block w-full"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
            />

            <InputError className="mt-2" message={errors.name} />
          </div>
          <div className="space-y-2">
            <InputLabel htmlFor="description" value="Description" />

            <TextArea
              id="description"
              className="mt-1 block w-full"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
            />

            <InputError className="mt-2" message={errors.description} />
          </div>
          <div className='space-y-2'>
            <InputLabel htmlFor="group_members" value="Add Members" />
            <ComboboxComponent
              url={route('users.index')}
              onChange={addMembers}
              initialSelected={[]}
              refId="group_members"
            />

            <InputError className="mt-2" message={errors.group_members} />
          </div>
        </Modal.Body>

        <Modal.Footer className="flex justify-between gap-4">
          <button className="btn btn-secondary flex-1" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn btn-primary flex-1">
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </form>
  );
}
