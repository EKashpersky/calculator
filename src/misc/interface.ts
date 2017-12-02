export interface iState_calculator {
  fetching: boolean,
  fetched?: boolean,
  error?: null|string,
  value?: string,
}

export interface iAction {
  payload: string,
  type: number|string,
}