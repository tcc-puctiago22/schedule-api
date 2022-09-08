const { make } = require('simple-body-validator');

const rules_schedule ={
    associeateUuid: ['required', 'string', 'min:36|max:36'],
    providerUuid: ['required', 'string', 'min:36|max:36'],
    partnerUuid: ['required', 'string', 'min:36|max:36'],
    NodeIterator: ['required', 'string', 'min:36|max:36'],
    scheduledDate: ['required', 'date'],
    scheduledTime: ['required', 'integer'],
};

 function validator_schedule(data) {
    return   make().setData(data).setRules(rules_schedule);
    
}

module.exports= {validator_schedule}
  