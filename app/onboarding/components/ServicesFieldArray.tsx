import React from 'react';
import { UseFieldArrayReturn, UseFormRegister } from 'react-hook-form';
import { OnboardingFormValues } from '../schemaOnboarding';

interface ServicesFieldArrayProps {
  label: string;
  fieldArray: UseFieldArrayReturn<OnboardingFormValues, 'services'>;
  register: UseFormRegister<OnboardingFormValues>;
}

const ServicesFieldArray: React.FC<ServicesFieldArrayProps> = ({
  label,
  fieldArray,
  register,
}) => {
  const { fields, append, remove } = fieldArray;

  return (
    <div className="mb-4 ">
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col mb-4   ">
          <input
            {...register(`services.${index}.name` as const)}
            placeholder="Nombre del servicio"
            className="border rounded-xl p-2 mb-2"
          />
          <textarea
            {...register(`services.${index}.description` as const)}
            placeholder="Descripción del servicio"
            className="border rounded-xl p-2 mb-2"
          />
          <input
            type="number"
            {...register(`services.${index}.price` as const, { valueAsNumber: true })}
            placeholder="Precio"
            className="border rounded-xl p-2 mb-2"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="bg-red-700 hover:bg-red-500 text-sm lg:text-base text-white py-1.5 lg:py-2 px-2 lg:px-4  rounded-xl"
          >
            Eliminar
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ name: '', description: '', price: 0 })}
        className="bg-sky-500 hover:bg-sky-400 text-sm lg:text-base text-white py-1.5 lg:py-2 px-2 lg:px-4  rounded-xl"
      >
        Agregar Servicio
      </button>
    </div>
  );
};

export default ServicesFieldArray;