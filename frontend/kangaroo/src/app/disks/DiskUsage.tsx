"use client"

import { useState } from "react";


export default function DiskUsage({ disks }) {
	const [hideSpecial, setHideSpecial] = useState(true);
	const specialFilesystems = ["tmpfs", "efivarfs", "proc", "sysfs", "devtmpfs", "devpts", "cgroup", "cgroup2", "securityfs", "pstore", "debugfs"];

	const filteredDisks = disks.disks.filter(
		disk => !hideSpecial || !specialFilesystems.includes(disk.type)
	).sort((a, b) => {
		return a.filesystem.localeCompare(b.filesystem);
	});

	return (
		<div className="p-4">
			<label className="flex items-center mb-4 space-x-2">
				<input
					type="checkbox"
					checked={hideSpecial}
					onChange={() => setHideSpecial(!hideSpecial)}
					className="form-checkbox h-4 w-4 text-blue-600" />
				<span className="text-sm">Hide special filesystems (tmpfs, proc, etc.)</span>
			</label>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
				{filteredDisks.map((disk, index) => (
					<div key={index} className="bg-black shadow-md rounded-2xl p-4 border">
						<h2 className="text-lg font-semibold mb-2">{disk.mountpath || disk.filesystem}</h2>
						<p><strong>Filesystem:</strong> {disk.filesystem}</p>
						<p><strong>Type:</strong> {disk.type}</p>
						<p><strong>Used:</strong> {formatBytes(disk.used)}</p>
						<p><strong>Free:</strong> {formatBytes(disk.available)}</p>
						<p><strong>Total:</strong> {formatBytes(disk.size)}</p>


						<div className="mt-2">
							<div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
								<div
									className="h-full bg-blue-500"
									style={{ width: `${(disk.used / disk.size) * 100}%` }}
								></div>
							</div>
							<p className="text-xs text-gray-600 mt-1">
								{((disk.used / disk.size) * 100).toFixed(1)}% used
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function formatBytes(bytes) {
	if (bytes === 0) return "0 B";
	const k = 1024;
	const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
