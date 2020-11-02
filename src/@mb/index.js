import utils from "./Utils/Utils";
import storage from "./Utils/LocalStorageMgr";
import ui from "./Utils/ui.helpers";
import { DateTimeHelper as dt } from "./Utils/date.helpers";
import lng from "./Utils/LanguageHelper";

import useClaims from "@mb/hooks/useClaims";
import ClaimKeys from "@mb/hooks/const.claims";

import { api } from "./api";
const { axios } = api;

export { axios, utils, storage, ui, dt, lng, api, useClaims, ClaimKeys };
