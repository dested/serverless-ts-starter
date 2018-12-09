import 'source-map-support/register';
import {UserController} from './controllers/userController';
import {LambdaRequestEvent} from './utils/models';


/*add more controllers here*/
registerClass(UserController);
/*registerClass(OtherController);*/




function registerClass(item: any) {
  for (const requestMethod of item.requestMethods) {
    module.exports[`${item.controllerName}_${requestMethod}`] = async (event: LambdaRequestEvent<any>) => {
      event.body = JSON.parse(event.body as any);
      event.params = {...event.body, ...event.queryStringParameters, ...event.pathParameters};
      return await item[requestMethod](event);
    };
  }
  for (const eventMethod of item.eventMethods) {
    console.log(`${item.controllerName}_${eventMethod}`);
    module.exports[`${item.controllerName}_${eventMethod}`] = async (event: LambdaRequestEvent<any>) => {
      event.body = JSON.parse(event.body as any);
      event.params = {...event.body, ...event.queryStringParameters, ...event.pathParameters};
      return await item[eventMethod](event);
    };
  }
}
