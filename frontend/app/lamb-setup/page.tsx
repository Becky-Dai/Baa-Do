/**
 * 中文：Lamb Setup 页面，双方共同创建 Pair Lamb。
 * English: Lamb Setup page where both users create their Pair Lamb together.
 */

import LambSetupForm from '../../components/lamb/LambSetupForm';

export default function LambSetupPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50 flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🐑</div>
          <h1 className="text-2xl font-bold text-green-800">认领你们的小羊</h1>
          <p className="text-sm text-gray-500 mt-1">Create your shared Pair Lamb</p>
          <p className="text-xs text-green-600 mt-2 bg-green-50 rounded-full px-3 py-1 inline-block">
            Beiqi 和 Alice 都在这里 ✨
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <LambSetupForm />
        </div>
      </div>
    </main>
  );
}
