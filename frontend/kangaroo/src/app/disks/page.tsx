import DiskUsage from "./DiskUsage";

async function getDiskUsage() {
	const res = await fetch(`http://localhost:8080/disks`, {
		next: { revalidate: 10 }
	});
	if (!res.ok) {
		throw new Error("Failed to fetch disk usage");
	}
	return res.json();
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
