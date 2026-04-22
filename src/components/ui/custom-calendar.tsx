import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NativeSelect } from './native-select';

interface CustomCalendarProps {
  selected?: Date;
  onSelect: (date: Date) => void;
  mode?: 'single';
  initialFocus?: boolean;
}

export function CustomCalendar({ selected, onSelect }: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(
    selected ? new Date(selected.getFullYear(), selected.getMonth(), 1) : new Date()
  );

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Generar años desde 2014 hasta el año actual + 5
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: (currentYear + 5) - 2014 + 1 }, (_, i) => 2014 + i);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];

    // Agregar días vacíos antes del primer día del mes
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Agregar todos los días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleMonthChange = (monthIndex: string) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), parseInt(monthIndex), 1));
  };

  const handleYearChange = (year: string) => {
    setCurrentMonth(new Date(parseInt(year), currentMonth.getMonth(), 1));
  };

  const handleDayClick = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onSelect(selectedDate);
  };

  const isSelectedDay = (day: number | null) => {
    if (!day || !selected) return false;
    return (
      selected.getDate() === day &&
      selected.getMonth() === currentMonth.getMonth() &&
      selected.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isToday = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    );
  };

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
      {/* Header con navegación y selectores */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="flex gap-2 flex-1">
          {/* Selector de Mes */}
          <NativeSelect
            value={currentMonth.getMonth().toString()}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="h-8 text-sm"
          >
            {monthNames.map((month, index) => (
              <option key={index} value={index.toString()}>
                {month}
              </option>
            ))}
          </NativeSelect>

          {/* Selector de Año */}
          <NativeSelect
            value={currentMonth.getFullYear().toString()}
            onChange={(e) => handleYearChange(e.target.value)}
            className="h-8 text-sm w-24"
          >
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </NativeSelect>
        </div>

        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Nombres de los días */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Días del mes */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const selected = isSelectedDay(day);
          const today = isToday(day);

          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDayClick(day)}
              className={`
                aspect-square flex items-center justify-center rounded-md text-sm font-medium
                transition-all
                ${selected
                  ? 'bg-[#022E5B] text-white hover:bg-[#011d40]'
                  : today
                  ? 'bg-blue-100 text-[#022E5B] hover:bg-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}