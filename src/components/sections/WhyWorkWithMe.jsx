import Section from '../ui/Section'
import Slider from '../ui/Slider'
import { Icon } from '../ui/icons'
import { profile } from '../../data/profile'

export default function WhyWorkWithMe() {
  return (
    <Section
      id="why"
      eyebrow="Why work with me"
      title="Engineering judgement, not just code"
      description="The combination that sets my work apart: manufacturing and quality experience, applied with AI, data, IoT and robotics."
      tinted
    >
      <Slider label="reasons to work with me" slideClass="basis-[72%] sm:basis-[40%] lg:basis-[30%] xl:basis-[23.5%]">
        {profile.whyWorkWithMe.map((item) => (
          <div key={item.title} className="h-full rounded-xl border border-line bg-surface p-4">
            <Icon name={item.icon} size={22} className="text-primary" />
            <h3 className="mt-2 font-semibold text-fg">{item.title}</h3>
            <p className="mt-1 text-sm text-muted">{item.text}</p>
          </div>
        ))}
      </Slider>
    </Section>
  )
}
