let tickets = [];
let counts = {
  SP: 0,
  SG: 0,
  SE: 0,
};
let sequence = 0;
async function create(req, res) {
  const validCodes = ["SP", "SG", "SE"];
  try {
    const ticketType = req.body.type;
    if (!validCodes.includes(ticketType)) {
      return res.status(400).json({ error: "Tipo de senha inválido" });
    }

    if (ticketType === "SG") {
      counts["SG"] = counts["SG"] + 1;
      sequence = counts["SG"];
    } else if (ticketType === "SE") {
      counts["SE"] = counts["SE"] + 1;
      sequence = counts["SE"];
    } else if (ticketType === "SP") {
      counts["SP"] = counts["SP"] + 1;
      sequence = counts["SP"];
    }

    const today = new Date();
    const year = String(today.getFullYear()).slice(-2);
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const ticketNumber = sequence;
    const ticket = `${year}${month}${day}-${ticketType}${ticketNumber}`;

    const ticketObj = {
      ticket,
      status: "created",
    };

    tickets.push(ticketObj);
    console.log("SENHAS:", tickets);
    return res.status(200).json(ticketObj);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao gerar senha" });
  }
}

function getActiveTickets(req, res) {
  const activeTickets = tickets.filter((ticket) => ticket.status == "created");
  return res.status(200).json(activeTickets);
}

function getFinishedTickets(req, res) {
  const finishedTickets = tickets.filter(
    (ticket) => ticket.status == "finished"
  );
  return res.status(200).json(finishedTickets);
}

function updateTicketStatus(req, res) {
  const ticketToDeactivate = req.params.ticketNumber;
  const ticketIndex = tickets.findIndex(
    (ticket) => ticket.ticket === ticketToDeactivate
  );

  if (ticketIndex === -1) {
    return res.status(404).json({ error: "Senha não encontrada" });
  }

  tickets[ticketIndex].status = "finished";
  return res.status(200).json({ message: "Senha atendida com sucesso" });
}
module.exports = {
  create,
  getActiveTickets,
  getFinishedTickets,
  updateTicketStatus,
};
