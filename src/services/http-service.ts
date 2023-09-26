import apiClient from "./api-client";

interface Entity {
  id: number;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getUser<T>(user: string, password: string) {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(
      this.endpoint + "/user/" + user + "/" + password,
      {
        signal: controller.signal,
      }
    );
    return { request, cancel: () => controller.abort() };
  }

  updateSession<T>(tipo: number, id: number) {
    const controller = new AbortController();
    const request = apiClient.put<T[]>(
      this.endpoint + "/user/" + tipo + "/" + id,
      {
        signal: controller.signal,
      }
    );
    return { request, cancel: () => controller.abort() };
  }

  getAllByDataMatricula<T>(dt: string, matricula: string) {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(
      this.endpoint + "/datamatricula/" + dt + "/" + matricula,
      {
        signal: controller.signal,
      }
    );
    return { request, cancel: () => controller.abort() };
  }

  getAllByMatricula<T>(filter: string) {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint + "/matricula/" + filter, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  getAllByDate<T>(filter: string) {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint + "/data/" + filter, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    return apiClient.delete(this.endpoint + "/" + id);
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.patch(this.endpoint + "/" + entity.id, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
