import { Mission } from '../../schema/mission';
import { columns } from './data-table/columns';
import DataTable from './data-table/data-table';

export default function MissionViewer({ missions }: { missions: Mission[] }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 overflow-x-auto">
      <DataTable columns={columns} data={missions} />
    </div>
  );
}
