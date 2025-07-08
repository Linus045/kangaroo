import DiskUsage from "./DiskUsage";

async function getDiskUsage() {
	const res = await fetch(`http://backend:8080/disks`, {
		next: { revalidate: 10 },
		cache: 'no-store'
	});
	if (!res.ok) {
		return {};
	}
	return await res.json();
}

export default async function DiskUsagePage() {
	const diskUsage = await getDiskUsage()

	return (

		<div className="flex">
			<div className="p-8 bg-gray-800">
				<DiskUsage disks={diskUsage} />
			</div>
		</div>

	)
}
