

export default function DiskUsage({disks}) {
	console.log(disks.disks)
	const listItems = disks.disks.map(disk =>
								 <li>Filesystem: {disk.filesystem}</li>
								);

								return <ul>{listItems}</ul>;
}
