export type SchedulerDateTime = Date | string | number;

//https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/reference/scheduler/#appointmentmodel
export interface AppointmentModel {
  startDate: SchedulerDateTime;
  endDate: SchedulerDateTime;
  allDay?: boolean;
  title: string;
  id?: number | string;
  rRule?: string;
  exDate?: string;
}

export interface ResourceInstance {
  id: number | string;
  text?: string;
  color?: string;
}

export interface Resource {
  id: number | string;
  fieldName: string;
  instances: ResourceInstance;
  title?: string;
  allowMultiple?: boolean;
}
