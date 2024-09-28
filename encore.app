{
	"id":   "zenlanes-services-tma2",
	"lang": "typescript",
	"build": {
		"docker": {
			"bundle_source": true
		}
	},
	"global_cors": {
		"debug": true,
		"allow_origins_without_credentials": ["http://localhost:3000", "https://*.zenlanes.com"],
		"allow_origins_with_credentials": ["http://localhost:3000", "https://*.zenlanes.com"]
	}
}
