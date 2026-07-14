External integration ports. Each port is an interface + provider-specific
adapters chosen by env config: KycPort (smileid|sumsub|stub), TranscodePort
(mux|stub), ChainPort (evm|stub), PaymentsPort (stripe|paystack|stub),
NotifyPort. Domain code depends only on the interfaces.
