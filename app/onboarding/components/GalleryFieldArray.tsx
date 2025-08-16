import React from 'react';
import { UseFieldArrayReturn, UseFormRegister } from 'react-hook-form';
import { OnboardingFormValues } from '../schemaOnboarding';

interface GalleryFieldArrayProps {
  label: string;
  placeholder?: string;
  fieldArray: UseFieldArrayReturn<OnboardingFormValues, 'gallery_items'>;
  register: UseFormRegister<OnboardingFormValues>;
}

const GalleryFieldArray: React.FC<GalleryFieldArrayProps> = ({
  label,
  placeholder,
  fieldArray,
  register,
}) => {
  const { fields, append, remove } = fieldArray;

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center mb-2">
          <input
            {...register(`gallery_items.${index}` as const)}
            placeholder={placeholder}
            className="border p-2 rounded flex-grow"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className=" text-red-500 hover:text-red-600 text-sm lg:text-base  px-2 py-1 rounded ml-2"
          >
            Eliminar
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append('')}
        className="bg-sky-500 hover:bg-sky-400 text-sm lg:text-base text-white py-1.5 lg:py-2 px-2 lg:px-4  rounded-xl"
      >
        Agregar Imagen
      </button>
    </div>
  );
};

export default GalleryFieldArray;