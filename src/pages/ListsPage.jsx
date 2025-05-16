import { useLocation } from 'react-router';
import Section from '../ui/Section';
import List from '../features/Lists/List';

function ListsPage() {
  const location = useLocation();
  const { listName } = location.state;
  return (
    <Section title={listName}>
      <List />
    </Section>
  );
}

export default ListsPage;
