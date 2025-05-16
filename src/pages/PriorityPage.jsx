import { useParams } from 'react-router';
import Priority from '../features/Tasks/Priority';
import Section from '../ui/Section';

function PriorityPage() {
  const params = useParams();
  return (
    <Section title={`Priority: ${params?.priorityTag}`}>
      <Priority />
    </Section>
  );
}

export default PriorityPage;
