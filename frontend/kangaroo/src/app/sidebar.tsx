import Link from "next/link";

export default function Sidebar() {
	return (
		<aside className="w-40 bg-gray-900 text-white p-4">
			<h1 className="text-xl font-bold mb-6">Homeserver</h1>
			<ul className="space-y-2 text-sm">
				<li className="hover:text-blue-400 cursor-pointer"><Link href="/">Overview</Link></li>
				<li className="hover:text-blue-400 cursor-pointer"><Link href="/disks">Disks</Link></li>
			</ul>
		</aside>
	)
}
