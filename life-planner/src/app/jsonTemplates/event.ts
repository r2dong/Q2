import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class Event {
  @JsonProperty("name", String, false)
  name: string = undefined;
}
