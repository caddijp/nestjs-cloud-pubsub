"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectPubsub = void 0;
const common_1 = require("@nestjs/common");
const pubsub_constants_1 = require("./pubsub.constants");
function InjectPubsub() {
    return (0, common_1.Inject)(pubsub_constants_1.PUBSUB_TOKEN);
}
exports.InjectPubsub = InjectPubsub;
