import deleteIcon from "./../assets/x.png";

export default function StackItem() {
  return (
    <div className="bg-primary-blue/10 border-primary-blue flex h-11 w-auto items-center justify-center gap-2 rounded border p-3">
      React
      <img className="h-5 w-5" src={deleteIcon} />
    </div>
  );
}
