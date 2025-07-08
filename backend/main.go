package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func test(c *gin.Context) {

	c.IndentedJSON(http.StatusOK, gin.H{"test": "ok"})

}

type DiskInfo struct {
	MountPath  string `json:"mount_path"`
	Size       string `json:"size"`
	Used       string `json:"used"`
	Available  string `json:"available"`
	Type       string `json:"type"`
	Filesystem string `json:"filesystem"`
}

type DiskUsage struct {
	Disks []DiskInfo `json:"disks"`
}

func diskUsage(c *gin.Context) {

	disks := []DiskInfo{
		{
			MountPath:  "/",
			Size:       "100G",
			Used:       "50G",
			Available:  "50G",
			Type:       "ext4",
			Filesystem: "/dev/sda1",
		},
		{
			MountPath:  "/home",
			Size:       "400G",
			Used:       "54G",
			Available:  "346G",
			Type:       "ext4",
			Filesystem: "/dev/sda2",
		},
	}
	c.IndentedJSON(http.StatusOK, DiskUsage{Disks: disks})
}

func main() {
	// fmt.Println("Hello, World!")

	router := gin.Default()
	router.GET("/test", test)
	router.GET("/disks", diskUsage)

	router.Run(":8080")
}
