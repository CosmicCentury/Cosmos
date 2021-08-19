export type SchedulerDateTime = Date | string | number;

//https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/reference/scheduler/#appointmentmodel
export interface AppointmentModel {
  startDate: SchedulerDateTime;
  endDate: SchedulerDateTime;
  allDay?: boolean;
  title: string;
  id?: number | string;
  exDate?: string;
}
