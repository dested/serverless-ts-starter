export function controller(name: string) {
  return (target: any) => {
    target.controllerName = name;
    target.requestMethods = target.requestMethods || [];
    target.eventMethods = target.eventMethods || [];
  };
}

export function request(method: 'GET' | 'POST' | 'PUT' | 'DELETE', route: string, options?: any) {
  return (classType: any, name: string) => {
    classType.requestMethods = classType.requestMethods || [];
    classType.requestMethods.push(name);
  };
}

export function event(rate: string) {
  return (classType: any, name: string) => {
    classType.eventMethods = classType.eventMethods || [];
    classType.eventMethods.push(name);
  };
}
