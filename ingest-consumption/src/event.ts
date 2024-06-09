import { APIGatewayEvent, EventBridgeEvent } from "aws-lambda";
import { parseISO } from "date-fns/parseISO";
import { subDays } from "date-fns/subDays";

export type Event = APIGatewayEvent | EventBridgeEvent<string, unknown>;

const DAYS_TO_FETCH = 14;

export function datesFromEvent(event: Event): { from: Date; to: Date } {
  const defaultFrom = subDays(new Date(), DAYS_TO_FETCH);
  const defaultTo = new Date();
  if (eventIsApiEvent(event)) {
    const query = event.queryStringParameters;
    return {
      from: query?.from ? parseISO(query?.from) : defaultFrom,
      to: query?.to ? parseISO(query?.to) : defaultTo,
    };
  } else {
    return {
      from: defaultFrom,
      to: defaultTo,
    };
  }
}

function eventIsApiEvent(event: Event): event is APIGatewayEvent {
  return "queryStringParameters" in event;
}
