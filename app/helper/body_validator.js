const { make } = require('simple-body-validator');

const rules_schedule ={
    associeate_uuid: ['required', 'string', 'min:36|max:36'],
    provider_uuid: ['required', 'string', 'min:36|max:36'],
    partner_uuid: ['required', 'string', 'min:36|max:36'],
    description: ['required', 'string', 'min:36|max:36'],
    scheduled_date: ['required', 'date'],
    scheduled_time: ['required', 'integer'],
};

export default function validator_schedule(data) {
    return   make().setData(data).setRules(rules_schedule);
    
}
  