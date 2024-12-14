import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

export default function Details({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="content">
      <Breadcrumb className="text-5xl">
        <BreadcrumbList>
          <BreadcrumbItem
            className="cursor-pointer hover:text-black"
            onClick={() => setPage('overview')}
          >
            Books
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid-cols-3">
        <img className="border-2 object-contain h-48 w-36 rounded-lg m-2 bg-gray-100"></img>
        <div>Title</div>
        <div>Content</div>
      </div>
    </div>
  );
}
