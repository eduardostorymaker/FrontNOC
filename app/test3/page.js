"use client"

import Test3 from "../../Components/Test/Test3";

export default function test3 () {
    
    const to = 'example@example.com';
  const from = 'your-email@example.com';
  const subject = 'Asunto del correo';
  const body = `
Estimados BOTN,

Se esta presentando afectación de los siguientes enlaces:


Alarmas:

Alarm ID	Severity	Comments	Last Occurred (ST)	Cleared On (ST)	Name	Alarm Source	Location Info	Other Information	Occurrences	First Occurred (ST)	Fiber/Cable Name	Cleared By	Acknowledged By	Clearance Status	Acknowledgement Status	Alarm Serial Number	Maintenance Status	Acknowledged On (ST)	
3	Critical		2024-08-28 17:04:22	2024-08-28 17:04:28	Link Down	rMPLSPolo1BR02	If Index=59 If Name=Eth-Trunk39 If Alias=[PeeringInt - Google] INTX rMPLSPolo1BR02 >> 100G Google Miami If Memo=--	If admin status=up If oper status=down If phy status=unreported Main If Name=Eth-Trunk39 LinkDown Reason=conditionsNotOK LSR ID=190.81.128.123	1	2024-08-28 17:04:22		< NE operator >		Cleared	Unacknowledged	1986011166	Normal		
3	Critical		2024-08-28 17:04:22	2024-08-28 17:04:22	Link Down	rMPLSPolo1BR02	If Index=145 If Name=100GE4/1/0 If Alias=INTX rMPLSPolo1BR02 >> IAM2PEPELPO1-USFLMNAP-G100-002 >> Google ID 485269748 If Memo=--	If admin status=up If oper status=down If phy status=unreported Main If Name=Eth-Trunk39 LinkDown Reason=physicalLinkDown LSR ID=190.81.128.123	1	2024-08-28 17:04:22		< NE operator >		Cleared	Unacknowledged	1986011165	Normal		
2619115	Major		2024-08-28 17:04:22	2024-08-28 17:04:29	Lacp State Down	rMPLSPolo1BR02	TrunkId=39 TrunkName=Eth-Trunk39 PortName=100GE4/1/0		1	2024-08-28 17:04:22		< NE operator >		Cleared	Unacknowledged	1986008095	Normal		
2600148	Major		2024-08-28 17:04:22	2024-08-28 17:04:44	Bgp Peer Backward Transition	rMPLSPolo1BR02	InstanceId=0 Afi=2 Safi=1 PeerType=IPV6 PeerRemoteAddr=2001:4860:0001:0001:0000:0000:0000:2526	LastError=66 BGP Peer State=idle PeerUnavaiReason=Direct connect-interface down IfName=Eth-Trunk39	1	2024-08-28 17:04:22		< NE operator >		Cleared	Unacknowledged	1986008094	Normal		
2600148	Major		2024-08-28 17:04:22	2024-08-28 17:04:32	Bgp Peer Backward Transition	rMPLSPolo1BR02	InstanceId=0 Afi=1 Safi=1 PeerType=IPV4 PeerRemoteAddr=74.125.51.188	LastError=66 BGP Peer State=idle PeerUnavaiReason=Direct connect-interface down IfName=Eth-Trunk39	1	2024-08-28 17:04:22		< NE operator >		Cleared	Unacknowledged	1986008093	Normal		
1102218	Major		2024-08-28 17:04:22	2024-08-28 17:04:27	Alarm of failed LAG negotiation	rMPLSPolo1BR02	Trunk Name=Eth-Trunk39 Trunk IfIndex=39 Port Name=100GE4/1/0 If Alias=INTX rMPLSPolo1BR02 >> IAM2PEPELPO1-USFLMNAP-G100-002 >> Google ID 485269748 If Memo=--		1	2024-08-28 17:04:22		< NE operator >		Cleared	Unacknowledged	1986008089	Normal		
1102219	Major		2024-08-28 17:04:22	2024-08-28 17:04:29	Alarm that all LAG bandwidth is lost	rMPLSPolo1BR02	Trunk Name=Eth-Trunk39 Trunk IfIndex=39 If Alias=[PeeringInt - Google] INTX rMPLSPolo1BR02 >> 100G Google Miami If Memo=--		1	2024-08-28 17:04:22		< NE operator >		Cleared	Unacknowledged	1986008088	Normal		
1100476	Major		2024-08-28 17:04:22	2024-08-28 17:04:44	BGP Status Changed	rMPLSPolo1BR02	BGP Peer IP=142.251.247.129	Final error in BGP peer establishment=Other Configuration Change BGP Local State=idle Reason=Direct connect-interface down If Name=Eth-Trunk39	1	2024-08-28 17:04:22		< NE operator >		Cleared	Unacknowledged	1986008072	Normal		
1100476	Major		2024-08-28 17:04:22	2024-08-28 17:04:32	BGP Status Changed	rMPLSPolo1BR02	BGP Peer IP=74.125.51.188	Final error in BGP peer establishment=Other Configuration Change BGP Local State=idle Reason=Direct connect-interface down If Name=Eth-Trunk39	1	2024-08-28 17:04:22		< NE operator >		Cleared	Unacknowledged	1986008071	Normal		
3	Critical		2024-08-28 16:04:47	2024-08-28 16:04:58	Link Down	rMPLSPolo1BR02	If Index=78 If Name=GigabitEthernet6/0/5 If Alias=[PeerInternet - CLARO] IDE 647268 INTX rMPLSPolo1BR02 10GE6/0/5 >> TISPARKLE - CLP006ULIMMI2NN >> GTT v4 239814-1582548 v6 239814-1671997 If Memo=--	If admin status=up If oper status=down If phy status=unreported Main If Name=Eth-Trunk17 LinkDown Reason=physicalLinkDown LSR ID=190.81.128.123	1	2024-08-28 16:04:47		< NE operator >		Cleared	Unacknowledged	1985930439	Normal		
2501784	Major		2024-08-28 16:02:40	2024-08-28 16:02:45	The LACP member interface's status changed from selected to unselected due to the PDU change	rMPLSPolo1BR02	Trunk Name=Eth-Trunk17 Trunk IfIndex=17 Port Name=GigabitEthernet6/0/5 If Alias=[PeerTierOne] INTX Claro Peru S.A. Nodo Polo1 rMPLSPolo1BR02 1er Trunk GTT If Memo=--	Lacp Old PDU Info=SystemID:f025-8ed6-ab92 Lacp New Pdu Info=SystemID:0000-0000-0000 Reason=Partner system ID changed in the received PDU	1	2024-08-28 16:02:40		< NE operator >		Cleared	Unacknowledged	1985925463	Normal		
2619115	Major		2024-08-28 16:02:01	2024-08-28 16:02:08	Lacp State Down	rMPLSPolo1BR02	TrunkId=17 TrunkName=Eth-Trunk17 PortName=GigabitEthernet6/0/5		1	2024-08-28 16:02:01		< NE operator >		Cleared	Unacknowledged	1985925285	Normal		
1102218	Major		2024-08-28 16:02:01	2024-08-28 16:02:06	Alarm of failed LAG negotiation	rMPLSPolo1BR02	Trunk Name=Eth-Trunk17 Trunk IfIndex=17 Port Name=GigabitEthernet6/0/5 If Alias=[PeerInternet - CLARO] IDE 647268 INTX rMPLSPolo1BR02 10GE6/0/5 >> TISPARKLE - CLP006ULIMMI2NN >> GTT v4 239814-1582548 v6 239814-1671997 If Memo=--		1	2024-08-28 16:02:01		< NE operator >		Cleared	Unacknowledged	1985925279	Normal		
1103104	Warning		2024-08-28 15:47:39	2024-08-28 15:49:04	Input rate alarm notification	rMPLSPolo1BR02	InterfaceName=GigabitEthernet15/0/1 If Alias=[PeerIntGoogle - CLARO] INTX Claro Peru S.A. rMPLSPolo1BR02 GE15/0/1 >> CIRION FRO2006615426 >> 10mo Google 13457471 If Memo=--	Input flow bandwidth usage=71 SubIfInputRateThreshold=70 IfIndex=98	1	2024-08-28 15:47:39		< NE operator >		Cleared	Unacknowledged	1985894497	Normal		
1103104	Warning		2024-08-28 15:03:42	2024-08-28 15:40:22	Input rate alarm notification	rMPLSPolo1BR02	InterfaceName=GigabitEthernet6/1/8 If Alias=[PeerIntGoogle - CLARO] INTX Claro Peru S.A. rMPLSPolo1BR02 GE6/1/8 >> TISPARKLE CLP012ULIMMI2NN >> 5to Google 20937780 If Memo=--	Input flow bandwidth usage=93 SubIfInputRateThreshold=90 IfIndex=93	1	2024-08-28 15:03:42		< NE operator >		Cleared	Unacknowledged	1985834050	Normal		
1103104	Warning		2024-08-28 15:03:30	2024-08-28 15:49:00	Input rate alarm notification	rMPLSPolo1BR02	InterfaceName=100GE4/1/0 If Alias=INTX rMPLSPolo1BR02 >> IAM2PEPELPO1-USFLMNAP-G100-002 >> Google ID 485269748 If Memo=--	Input flow bandwidth usage=76 SubIfInputRateThreshold=70 IfIndex=145	1	2024-08-28 15:03:30		< NE operator >		Cleared	Unacknowledged	1985840558	Normal		


  `;

  const handleClick = () => {
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&from=${encodeURIComponent(from)}`;
    window.location.href = mailtoLink;
  }

  const toCopy = () => {
    const text = "este texto es de copia"
    navigator.clipboard.writeText(body).then(() => {
        console.log("texto copiado")
        setTimeout(() => console.log("reseteado copiado"), 2000); // Resetea el estado después de 2 segundos
      });
  }

  function copyToClipboard(text) {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      console.log('Texto copiado al portapapeles');
    } catch (err) {
      console.error('Error al copiar al portapapeles', err);
    }
    document.body.removeChild(textArea);
  }


  return (
    <div>
        <button onClick={handleClick}>
        Enviar correo
        </button>
        <button onClick={toCopy}>
        Copiar test 1
        </button>
        <button onClick={()=>copyToClipboard("test 3")}>
        Copiar test 3
        </button>

    </div>
  )
}

    