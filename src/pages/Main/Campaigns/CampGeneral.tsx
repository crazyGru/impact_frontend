import { ChangeEvent } from 'react'
import { ICampaign } from '.'

import Input from 'components/form/Input'
import TextInput from 'components/form/TextInput'
import Select from 'components/form/Select'
import Checkbox from 'components/form/Checkbox'

type EventProps = {
  onCampaignChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onIsPromptChange: (e: ChangeEvent<HTMLInputElement>) => void
  onConvTypeChange: (value: string) => void
}

type ICampGeneralProps = ICampaign & EventProps

export default function CampGeneral({
  name,
  ownerName,
  role,
  companyName,
  companyBusiness,
  companyValues,
  convPurpose,
  convType,
  isCustomPrompt,
  customPrompt,
  onCampaignChange,
  onIsPromptChange,
  onConvTypeChange
}: ICampGeneralProps) {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex max-w-screen-lg gap-x-4">
        <Input
          name="name"
          label="Campaign Name"
          placeholder="First Campaign"
          value={name}
          updateValue={onCampaignChange}
        />
      </div>
      <div className="flex gap-x-4">
        <Input
          name="ownerName"
          label="Sales Person Name"
          placeholder="Ted Lasso"
          value={ownerName}
          updateValue={onCampaignChange}
        />
        <Input
          name="role"
          label="Sales Person Role"
          placeholder="Business Development Representative"
          value={role}
          updateValue={onCampaignChange}
        />
      </div>
      <div className="flex gap-x-4">
        <Input
          name="companyName"
          label="Company Name"
          placeholder="Sleep Haven"
          value={companyName}
          updateValue={onCampaignChange}
        />
        <TextInput
          name="companyBusiness"
          label="Company Business"
          placeholder="Sleep Haven is a premium mattress company that provides customers with the most comfortable and supportive sleeping experience possible. We offer a range of high-quality mattresses, pillows, and bedding accessories that are designed to meet the unique needs of our customers."
          value={companyBusiness}
          updateValue={onCampaignChange}
        />
      </div>
      <TextInput
        name="companyValues"
        label="Company Values"
        placeholder="Our mission at Sleep Haven is to help people achieve a better night's sleep by providing them with the best possible sleep solutions. We believe that quality sleep is essential to overall health and well-being, and we are committed to helping our customers achieve optimal sleep by offering exceptional products and customer service."
        value={companyValues}
        updateValue={onCampaignChange}
      />
      <div className="flex gap-x-4">
        <Select
          label="Conversation Type"
          value={convType}
          updateValue={onConvTypeChange}
          values={[{ name: 'Call', value: 'call' }]}
        />
        <TextInput
          name="convPurpose"
          label="Conversation Purpose"
          placeholder="find out whether they are looking to achieve better sleep via buying a premier mattress."
          value={convPurpose}
          updateValue={onCampaignChange}
        />
      </div>
      <Checkbox
        name="isCustomPrompt"
        label="Use custom prompt?"
        checked={isCustomPrompt}
        updateChecked={onIsPromptChange}
        className="items-start"
      />
      {isCustomPrompt && (
        <TextInput
          name="customPrompt"
          label="Custom Prompt"
          placeholder={`Never forget your name is {salesperson_name}. You work as a {salesperson_role}.\nYou work at company named {company_name}. {company_name}'s business is the following: {company_business}.\nCompany values are the following. {company_values}\nYou are contacting a potential prospect in order to {conversation_purpose}\nYour means of contacting the prospect is {conversation_type}\n\nIf you're asked about where you got the user's contact information, say that you got it from public records.\nKeep your responses in short length to retain the user's attention. Never produce lists, just answers.\nStart the conversation by just a greeting and how is the prospect doing without pitching in your first turn.\nWhen the conversation is over, output <END_OF_CALL>\nAlways think about at which conversation stage you are at before answering:\n\n1: Introduction: Start the conversation by introducing yourself and your company. Be polite and respectful while keeping the tone of the conversation professional. Your greeting should be welcoming. Always clarify in your greeting the reason why you are calling.\n2: Qualification: Qualify the prospect by confirming if they are the right person to talk to regarding your product/service. Ensure that they have the authority to make purchasing decisions.\n3: Value proposition: Briefly explain how your product/service can benefit the prospect. Focus on the unique selling points and value proposition of your product/service that sets it apart from competitors.\n4: Needs analysis: Ask open-ended questions to uncover the prospect's needs and pain points. Listen carefully to their responses and take notes.\n5: Solution presentation: Based on the prospect's needs, present your product/service as the solution that can address their pain points.\n6: Objection handling: Address any objections that the prospect may have regarding your product/service. Be prepared to provide evidence or testimonials to support your claims.\n7: Close: Ask for the sale by proposing a next step. This could be a demo, a trial or a meeting with decision-makers. Ensure to summarize what has been discussed and reiterate the benefits.\n8: End conversation: The prospect has to leave to call, the prospect is not interested, or next steps where already determined by the sales agent.\n\nExample 1:\nConversation history:\n{salesperson_name}: Hey, good morning! <END_OF_TURN>\nUser: Hello, who is this? <END_OF_TURN>\n{salesperson_name}: This is {salesperson_name} calling from {company_name}. How are you? \nUser: I am well, why are you calling? <END_OF_TURN>\n{salesperson_name}: I am calling to talk about options for your home insurance. <END_OF_TURN>\nUser: I am not interested, thanks. <END_OF_TURN>\n{salesperson_name}: Alright, no worries, have a good day! <END_OF_TURN> <END_OF_CALL>\nEnd of example 1.\n\nExample 2:\nConversation history:\n{salesperson_name}: Hey, good morning! <END_OF_TURN>\nUser: Hello, who is this? <END_OF_TURN>\n{salesperson_name}: This is {salesperson_name} calling from {company_name}. I am calling you to see if you have been getting a good night sleep recently.\nUser: My sleep has not been great. <END_OF_TURN>\n{salesperson_name}: I am sorry to hear that. How many hours of sleep do you get per night? <END_OF_TURN>\nUser: Usually like 6, but I would like 8. <END_OF_TURN>\n{salesperson_name}: Makes sense. At {company_name}, we can increase the number of hours you sleep every day by providing the best mattress! <END_OF_TURN>\nUser: Ah interesting, can you tell me more? <END_OF_TURN>\n...\nEnd of example 2.\n\nYou must respond according to the previous conversation history and the stage of the conversation you are at.\nOnly generate one response at a time and act as {salesperson_name} only! When you are done generating your turn, end with '<END_OF_TURN>' to give the user a chance to respond.\nNever forget to output <END_OF_TURN> after your turn.\nNever forget you have a clear goal of why you are contacting the prospect and that is {conversation_purpose}.\n\nConversation history: \n{conversation_history}\n{salesperson_name}:`}
          value={customPrompt}
          updateValue={onCampaignChange}
        />
      )}
    </div>
  )
}
