package structs

//Configs : API設定
type Configs struct {
	Addr       string `json:"addr,omitempty"`
	Port       int    `json:"port,omitempty"`
	ServAddr   string `json:"servAddr,omitempty"`
	ServPort   int    `json:"servPort,omitempty"`
	ConnTime   int    `son:"connTime,omitempty"`
	ReconnTime int    `json:"reconnTime,omitempty"`
}
