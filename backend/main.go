package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/shirou/gopsutil/disk"
	"net/http"
	// human "github.com/dustin/go-humanize"
)

func test(c *gin.Context) {

	c.IndentedJSON(http.StatusOK, gin.H{"test": "ok"})

}

type DiskInfo struct {
	MountPath  string `json:"mountpath"`
	Size       uint64 `json:"size"`
	Used       uint64 `json:"used"`
	Available  uint64 `json:"available"`
	Type       string `json:"type"`
	Filesystem string `json:"filesystem"`
}

type DiskUsage struct {
	Disks []DiskInfo `json:"disks"`
}

func diskUsage(c *gin.Context) {

	var disks = []DiskInfo{}

	parts, _ := disk.Partitions(true)
	for _, p := range parts {
		device := p.Mountpoint
		s, _ := disk.Usage(device)

		if s == nil || s.Total == 0 {
			continue
		}
		fmt.Printf("%s %d\n", p.Device, s.Total)

		disks = append(disks, DiskInfo{
			MountPath:  p.Mountpoint,
			Size:       s.Total,
			Used:       s.Used,
			Available:  s.Free,
			Type:       p.Fstype,
			Filesystem: p.Device,
		})
	}
	c.IndentedJSON(http.StatusOK, DiskUsage{Disks: disks})
}

func main() {

	formatter := "%-14s %7s %7s %7s %4s %s\n"
	fmt.Printf(formatter, "Filesystem", "Size", "Used", "Avail", "Use%", "Mounted on")

	router := gin.Default()
	router.GET("/test", test)
	router.GET("/disks", diskUsage)

	router.Run(":8080")
}
