import type { AxiosInstance } from "axios";

export abstract class Service {
  protected readonly agent: AxiosInstance;
  
  constructor(agent: AxiosInstance) {
    this.agent = agent;
  }
}