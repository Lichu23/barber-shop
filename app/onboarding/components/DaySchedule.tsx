import { UseFieldArrayReturn, UseFormRegister } from "react-hook-form";
import { OnboardingFormValues } from "../schemaOnboarding";


type DayKey = keyof OnboardingFormValues["available_times"];

type DayScheduleProps = {
  days: DayKey[];
  timeArrays: Record<
    DayKey,
    UseFieldArrayReturn<OnboardingFormValues, `available_times.${DayKey}`, "id">
  >;
  register: UseFormRegister<OnboardingFormValues>;
};
export const DaySchedule = ({
  days,
  timeArrays,
  register,
}: DayScheduleProps) => (
  <div className="lg:p-4 lg:border rounded">
    <h2 className="text-lg font-bold mb-2">Horarios por día</h2>
    {days.map((day) => {
      const fieldArray = timeArrays[day];
      return (
        <div key={day} className="mb-4">
          <div className="flex items-center justify-between">
            <span className="font-normal capitalize">{day}</span>
            <button
              type="button"
              onClick={() => fieldArray.append({ start: "", end: "" })}
              className="text-sm text-sky-600 hover:text-sky-400"
            >
              + Añadir rango
            </button>
          </div>
          {fieldArray.fields.length === 0 ? (
            <p className="text-sm text-gray-500">Sin rangos definidos</p>
          ) : (
            fieldArray.fields.map((field, idx) => (
              <div key={field.id} className="flex gap-2 mt-2 items-center">
                <input
                  className="border rounded-xl px-2 py-1 w-24"
                  placeholder="Hora inicio"
                  {...register(`available_times.${day}.${idx}.start`)}
                />
                <span>—</span>
                <input
                  className="border rounded-xl px-2 py-1 w-24"
                  placeholder="Hora fin"
                  {...register(`available_times.${day}.${idx}.end`)}
                />
                <button
                  type="button"
                  onClick={() => fieldArray.remove(idx)}
                  className="text-red-500 text-sm"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
      );
    })}
  </div>
);
