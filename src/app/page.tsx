export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <h1 className="text-4xl font-bold text-center">O que deseja?</h1>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center gap-4">
          <a
            href="/teachers"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Buscar professor
          </a>
          <a
            href="/feedback"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Cadastrar feedback
          </a>
        </div>
      </div>
    </main>
  );
}
