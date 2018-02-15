import { JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class Project {

  @JsonProperty("name", String, false)
  name: string = undefined;
  @JsonProperty("description", String, false)
  description: string = undefined;

}
