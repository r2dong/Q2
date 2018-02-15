import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class Task {
  @JsonProperty("name", String ,false)
  name: string = undefined;

}







